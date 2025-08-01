terraform plan -destroy -out main.destroy.tfplan
terraform apply main.destroy.tfplan
terraform plan -out main.tfplan 
terraform apply main.tfplan 
