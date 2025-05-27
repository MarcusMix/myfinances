from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from .. import models, database, auth

router = APIRouter(
    prefix="/total",
    tags=["totais"]
)

@router.get("", response_model=models.Total)
def get_total(
    mes: int = None,
    ano: int = None,
    db: Session = Depends(database.get_db),
    current_user: database.Usuario = Depends(auth.get_current_user)
):
    query = db.query(func.sum(database.Despesa.valor).label("TOTAL")).filter(
        database.Despesa.usuario_id == current_user.id
    )
    if mes and ano:
        query = query.filter(database.Despesa.mes == mes, database.Despesa.ano == ano)
    
    result = query.first()
    return {"TOTAL": result.TOTAL or 0} 