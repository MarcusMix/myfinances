from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import models, database, auth

# Lista para armazenar tokens inválidos (em produção, use um Redis ou banco de dados)
blacklisted_tokens = set()

router = APIRouter(
    prefix="/auth",
    tags=["autenticação"]
)

@router.post("/usuario", response_model=models.Usuario)
def create_usuario(usuario: models.UsuarioCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(database.Usuario).filter(database.Usuario.email == usuario.email).first()
    if db_user:
        raise HTTPException(status_code=409, detail="Email já cadastrado")
    
    hashed_password = auth.get_password_hash(usuario.senha)
    db_user = database.Usuario(
        email=usuario.email,
        senha=hashed_password,
        nome=usuario.nome,
        dt_nascimento=usuario.dt_nascimento
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=models.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(database.Usuario).filter(database.Usuario.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(token: str = Depends(auth.oauth2_scheme)):
    """
    Rota para fazer logout do usuário.
    Adiciona o token atual à lista de tokens inválidos.
    """
    blacklisted_tokens.add(token)
    return {"message": "Logout realizado com sucesso"} 