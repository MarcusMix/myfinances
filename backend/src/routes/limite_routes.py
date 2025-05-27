from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, database, auth

router = APIRouter(
    prefix="/limites",
    tags=["limites"]
)

@router.get("", response_model=List[models.Limite])
def get_limites(
    mes: int = None,
    ano: int = None,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    query = db.query(database.Limite).filter(database.Limite.usuario_id == current_user.id)
    if mes and ano:
        query = query.filter(database.Limite.mes == mes, database.Limite.ano == ano)
    return query.all()

@router.post("", response_model=models.Limite)
def create_limite(
    limite: models.LimiteCreate,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    db_limite = database.Limite(**limite.dict(), usuario_id=current_user.id)
    db.add(db_limite)
    db.commit()
    db.refresh(db_limite)
    return db_limite

@router.delete("/{id}")
def delete_limite(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    limite = db.query(database.Limite).filter(
        database.Limite.id == id,
        database.Limite.usuario_id == current_user.id
    ).first()
    if not limite:
        raise HTTPException(status_code=404, detail="Limite não encontrado")
    db.delete(limite)
    db.commit()
    return {"message": "Limite removido com sucesso"}

@router.put("/{id}", response_model=models.Limite)
def update_limite(
    id: int,
    limite: models.LimiteCreate,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    db_limite = db.query(database.Limite).filter(
        database.Limite.id == id,
        database.Limite.usuario_id == current_user.id
    ).first()
    if not db_limite:
        raise HTTPException(status_code=404, detail="Limite não encontrado")
    
    for key, value in limite.dict().items():
        setattr(db_limite, key, value)
    
    db.commit()
    db.refresh(db_limite)
    return db_limite 