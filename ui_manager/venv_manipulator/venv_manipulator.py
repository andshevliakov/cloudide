import venv


class VenvManipulator:
    def __init__(self, venv_path: str, user_name: str) -> None:
        venv.create(venv_path, system_site_packages=False)
