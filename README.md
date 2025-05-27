# Backend Python

Este é um projeto backend desenvolvido em Python.

## Pré-requisitos

Certifique-se de ter o Python 3.x e o pip instalados em sua máquina.

Você pode verificar as versões instaladas com os seguintes comandos:

```bash
python --version
pip --version
```

## Configuração

1. Clone este repositório (se ainda não o fez).
2. Navegue até o diretório do projeto no terminal.
3. É altamente recomendável criar um ambiente virtual para isolar as dependências do projeto:

   ```bash
   python3 -m venv .venv
   ```

4. Ative o ambiente virtual:

   - No Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - No macOS e Linux:
     ```bash
     source .venv/bin/activate
     ```

5. Instale as dependências do projeto. Geralmente, as dependências estão listadas em um arquivo `requirements.txt`.

   ```bash
   pip install -r requirements.txt
   ```

   **Observação:** Se não houver um arquivo `requirements.txt`, talvez seja necessário instalar as dependências manualmente ou verificar a documentação específica do projeto.

## Como Rodar o Projeto

Depois de instalar as dependências, você pode rodar o projeto. O comando exato pode variar dependendo de como o projeto está estruturado (por exemplo, usando Flask, Django, FastAPI, ou um script simples).

Um comando comum para iniciar uma aplicação Python pode ser:

```bash
uvicorn src.main:app --reload --port 8090
```

