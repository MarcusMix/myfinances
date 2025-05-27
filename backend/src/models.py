from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UsuarioBase(BaseModel):
    email: EmailStr
    nome: str
    dt_nascimento: str

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int] = None

class DespesaBase(BaseModel):
    descricao: str
    valor: float
    mes: int
    ano: int
    icone: str

class DespesaCreate(DespesaBase):
    pass

class Despesa(DespesaBase):
    id: int
    usuario_id: int

    class Config:
        from_attributes = True

class LimiteBase(BaseModel):
    valor: float
    mes: int
    ano: int

class LimiteCreate(LimiteBase):
    pass

class Limite(LimiteBase):
    id: int
    usuario_id: int

    class Config:
        from_attributes = True

class Total(BaseModel):
    TOTAL: float 