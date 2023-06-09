import subprocess


class Runner:
    def __init__(self):
        pass

    def run_code(self, code_snippet: str) -> str:
        result = subprocess.run(
            ['python', '-c', f"{code_snippet}"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            error_output = result.stderr.strip()
            raise Exception(error_output)

        return result.stdout.strip()

    def install_package(self, package_name: str) -> str:
        result = subprocess.run(
            ['conda', 'install', "-y", "-c", "conda-forge", f"{package_name}"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            error_output = result.stderr.strip()
            raise Exception(error_output)

        return result.stdout.strip()
