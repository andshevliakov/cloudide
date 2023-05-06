import subprocess


class Runner:
    def __init__(self):
        pass

    def run_code(self, code_snippet: str) -> str:
        result = subprocess.run(
            code_snippet, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        if result.returncode != 0:
            error_output = result.stderr.strip()
            raise Exception(error_output)

        return result.stdout.strip()
