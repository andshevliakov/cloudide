FROM python:3.11

WORKDIR /server

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python", "main.py" ]
