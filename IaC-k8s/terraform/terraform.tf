terraform {
  required_providers {
    aws = {
      source  = "hashicorp/terraform"
      version = "~> 4.41"
    }
  }

  required_version = ">= 1.2"
}
