FROM public.ecr.aws/lambda/nodejs:18 


RUN yum install -y java-1.8.0-openjdk python3 gcc-c++ java-devel


COPY . .
RUN npm install
CMD ["dist/handler.receiver"]

