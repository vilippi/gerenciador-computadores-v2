# 💻 Gerenciador de Computadores – App Desktop

Aplicativo desktop leve e moderno para **cadastro, edição, histórico e gerenciamento de computadores**, desenvolvido com Electron, Vite, React, Material UI e MongoDB. Ideal para uso **interno**, com **persistência na nuvem via MongoDB Atlas**.

---

## ✅ Funcionalidades

- 🔐 **Autenticação de usuários** com controle de acesso
- 📥 **Cadastro de computadores** com:
  - Nome do PC
  - Número de identificação
  - Processador
  - Placa de Vídeo
  - Memória RAM
  - Armazenamento
  - Status (Disponível, Em uso, Em manutenção, etc.)
  - Comentário para status problemáticos
  - Antigo dono (nome, e-mail, setor, empresa)
  - Atual dono (nome, e-mail, setor, empresa)
- 📋 **Listagem de computadores** com visual moderno e status destacados via Chips
- 🔁 **Edição de computadores** com atualização completa de dados
- 🕓 **Histórico automático de alterações**, incluindo:
  - Mudança de dono  
  - Atualização de hardware  
  - Alteração de status
- 📊 **Exportação da tabela** de computadores em formato `.xlsx` (Excel)
- ☁️ **Persistência de dados na nuvem com MongoDB Atlas**
- 🤖 **Agente de IA integrado** (`Gemini 2.5 Flash`) para:
  - Auxílio na manutenção dos computadores  
  - Identificação inteligente de possíveis problemas  
- 🎨 Interface intuitiva e elegante com **Material UI**
- 📦 Distribuição como aplicativo `.exe` com **Electron Builder**

---

## 🛠 Tecnologias Utilizadas

- [Electron](https://www.electronjs.org/) – App desktop
- [Vite](https://vitejs.dev/) – Bundler rápido e leve
- [React](https://react.dev/) – Biblioteca de UI
- [Material UI](https://mui.com/) – Componentes estilizados
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) – Backend / API REST
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Banco de dados na nuvem
- [Mongoose](https://mongoosejs.com/) – ODM para MongoDB
- [Google AI Gemini](https://aistudio.google.com/) – IA para diagnóstico e suporte à manutenção
- [xlsx](https://www.npmjs.com/package/xlsx) – Geração de planilhas Excel  
- [systeminformation](https://www.npmjs.com/package/systeminformation) – Coleta de dados do hardware local

