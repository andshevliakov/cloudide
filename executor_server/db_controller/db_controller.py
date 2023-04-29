import logging
import mysql.connector

DATABASE_CREATION_QUERY = 'CREATE DATABASE'
TABLE_CREATION_QUERY = 'CREATE TABLE'
# TODO ORM


class DBController():
    def __init__(self, host: str, user: str, passwd: str, db: str, table='', columns={}) -> None:
        try:
            self._conn = mysql.connector.connect(
                host=host,
                user=user,
                password=passwd,
                database=db
            )
            self._cursor = self._conn.cursor()
        except mysql.connector.errors.ProgrammingError:
            self._conn = mysql.connector.connect(
                host=host,
                user=user,
                password=passwd
            )
            cursor = self._conn.cursor()
            cursor.execute(f"{DATABASE_CREATION_QUERY} {db}")
            cursor.close()

        if not self._conn.is_connected():
            raise mysql.connector.errors.DatabaseError(
                'Database connection not established')

        if table != '':
            self._create_table(table, columns)

    def _create_table(self, table: str, columns: dict) -> None:
        query = f"{TABLE_CREATION_QUERY} {table} ("
        columnrows = []
        for key, value in columns.items():
            columnrows.append(f"{key} {value}")
        query += ', '.join(columnrows)
        query += ');'
        try:
            cursor = self._conn.cursor()
            cursor.execute(query)
            cursor.close()
        except mysql.connector.errors.DatabaseError as e:
            logging.warning('Database error: %s', e)

    def is_exist_in_db(self, table: str, values: dict) -> tuple:
        query = f"SELECT * FROM {table} WHERE "
        params = []
        for key, value in values.items():
            params.append(f"{key}='{value}'")
        query += " AND ".join(params)
        bool_query = f"SELECT EXISTS({query})"

        cursor = self._conn.cursor()
        cursor.execute(bool_query)
        result = cursor.fetchone()
        cursor.close()
        return result

    def add_row_in_db(self, table: str, values: dict) -> tuple:
        query = f"INSERT INTO {table} ("
        params_columns = []
        params_insert = []
        for key, values in values.items():
            params_columns.append(f"{key}")
            params_insert.append(f"'{values}'")
        query += ",".join(params_columns)
        query += ') VALUES ('
        query += ",".join(params_insert)
        query += ")"
        cursor = self._conn.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result
