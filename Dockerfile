FROM node:lts as runtime
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ENV PORT=4444
EXPOSE 4444
CMD NODE_ENV=production node .build/server.cjs --serve