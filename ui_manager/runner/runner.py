class Runner:
    def __init__(self):
        pass

# TODO security issues
    def run_code(self, code_snippet: str) -> None:
        print(exec(code_snippet))
