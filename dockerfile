# Dockerfile for React Frontend

# Utiliser une image Node.js officielle pour construire le frontend
FROM node:20 as build

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utiliser Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers de construction dans le répertoire de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
