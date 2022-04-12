FROM ubuntu:16.04
RUN apt-get update -y
RUN apt-get install curl vim sudo build-essential -y
RUN apt-get update || : && apt-get install python -y
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;

RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME
RUN apt-get install python3-pip -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v

COPY . .
RUN mkdir temp
RUN chmod 700  /
RUN chmod 755 -R temp/
RUN  npm install
CMD npm run build &&  npm start 

