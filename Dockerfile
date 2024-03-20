FROM public.ecr.aws/lambda/nodejs:18 


RUN yum install -y java-1.8.0-openjdk
RUN yum install -y python3
RUN yum install -y gcc-c++


COPY . .
RUN mkdir temp
RUN chmod 700  /
RUN chmod 755 -R temp/
RUN npm install
CMD ["dist/handler.receiver"]

