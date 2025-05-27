from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, database, auth

router = APIRouter(
    prefix="/despesas",
    tags=["despesas"]
)

@router.post("", response_model=models.Despesa)
def create_despesa(
    despesa: models.DespesaCreate,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    db_despesa = database.Despesa(**despesa.dict(), usuario_id=current_user.id)
    db.add(db_despesa)
    db.commit()
    db.refresh(db_despesa)
    return db_despesa

@router.get("", response_model=List[models.Despesa])
def get_despesas(
    mes: int = None,
    ano: int = None,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    query = db.query(database.Despesa).filter(database.Despesa.usuario_id == current_user.id)
    if mes and ano:
        query = query.filter(database.Despesa.mes == mes, database.Despesa.ano == ano)
    return query.all()

@router.delete("/{id}")
def delete_despesa(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    despesa = db.query(database.Despesa).filter(
        database.Despesa.id == id,
        database.Despesa.usuario_id == current_user.id
    ).first()
    if not despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    db.delete(despesa)
    db.commit()
    return {"message": "Despesa removida com sucesso"}

@router.put("/{id}", response_model=models.Despesa)
def update_despesa(
    id: int,
    despesa: models.DespesaCreate,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    db_despesa = db.query(database.Despesa).filter(
        database.Despesa.id == id,
        database.Despesa.usuario_id == current_user.id
    ).first()
    if not db_despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    
    for key, value in despesa.dict().items():
        setattr(db_despesa, key, value)
    
    db.commit()
    db.refresh(db_despesa)
    return db_despesa 