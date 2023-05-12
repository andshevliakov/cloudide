FROM python:3.11

WORKDIR /server

#Workaround to make faster build from cache
COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENTRYPOINT [ "python", "main.py" ]
