package controller

import "fmt"

func createUserResourceName(username string) string {
	return fmt.Sprintf("%s-%s", username, "executor")
}

func createUserResourceNamespace(username string) string {
	return fmt.Sprintf("%s-%s-%s", username, "executor", "ns")
}

func createUserResourceService(username string) string {
	return fmt.Sprintf("%s-%s-%s", username, "executor", "service")
}
