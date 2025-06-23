import os
import subprocess
import sys
import time
import signal
from threading import Thread

def is_port_in_use(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def run_backend():
    print("Iniciando o backend...")
    os.chdir("backend")
    
    # Verifica se o ambiente virtual existe
    venv_path = ".venv"
    if not os.path.exists(venv_path):
        print("Criando ambiente virtual...")
        subprocess.run([sys.executable, "-m", "venv", venv_path])
    
    # Ativa o ambiente virtual e instala as dependências
    activate_script = os.path.join(venv_path, "bin", "activate")
    pip_path = os.path.join(venv_path, "bin", "pip")
    
    # Instala as dependências
    print("Instalando dependências do backend...")
    subprocess.run([pip_path, "install", "-r", "requirements.txt"])
    
    # Inicia o servidor backend com o ambiente virtual ativado
    print("Iniciando servidor backend na porta 8090...")
    python_path = os.path.join(venv_path, "bin", "python")
    subprocess.run([python_path, "-m", "uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8090"])

def run_frontend():
    print("Iniciando o frontend...")
    os.chdir("frontend")
    
    # Verifica se o node_modules existe
    if not os.path.exists("node_modules"):
        print("Instalando dependências do frontend...")
        subprocess.run(["npm", "install"])
    
    # Inicia o servidor frontend
    print("Iniciando servidor frontend...")
    subprocess.run(["npm", "start"])

def main():
    # Verifica se as portas necessárias estão disponíveis
    if is_port_in_use(8090):
        print("Erro: A porta 8090 já está em uso. Por favor, libere a porta e tente novamente.")
        return
    
    # Salva o diretório atual
    original_dir = os.getcwd()
    
    try:
        # Inicia o backend em uma thread separada
        backend_thread = Thread(target=run_backend)
        backend_thread.daemon = True
        backend_thread.start()
        
        # Aguarda o backend iniciar
        time.sleep(5)
        
        # Volta para o diretório original
        os.chdir(original_dir)
        
        # Inicia o frontend
        run_frontend()
        
    except KeyboardInterrupt:
        print("\nEncerrando os serviços...")
        os.chdir(original_dir)
        sys.exit(0)
    except Exception as e:
        print(f"Erro ao iniciar os serviços: {str(e)}")
        os.chdir(original_dir)
        sys.exit(1)

if __name__ == "__main__":
    main()

