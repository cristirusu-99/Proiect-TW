FROM node:8

ENV PORT 4040

EXPOSE 4040

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]