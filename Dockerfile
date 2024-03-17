# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
