from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List

class UsuarioBase(BaseModel):
    email: EmailStr
    nome: str
    dt_nascimento: str

class UsuarioCreate(UsuarioBase):
    senha: str
    senha_confirmacao: str
    
    @validator('senha_confirmacao')
    def senhas_coincidem(cls, v, values):
        if 'senha' in values and v != values['senha']:
            raise ValueError('As senhas não coincidem')
        return v

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

class ErrorResponse(BaseModel):
    detail: str