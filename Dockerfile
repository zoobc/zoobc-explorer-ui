#################################################################
# How to :
# Build : docker build -t zoobc-exp-ui .
# Run : docker run --name zoobc-exp-ui -d -p 80:80 zoobc-exp-ui
#################################################################

FROM nginx

COPY build /usr/share/nginx/html
