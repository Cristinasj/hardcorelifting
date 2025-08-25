az group create --name rke-cluster-rg --location eastus

# VNet + Subnet
az network vnet create \
  --resource-group rke-cluster-rg \
  --name rke-vnet \
  --subnet-name rke-subnet

# Controlplane NSG
az network nsg create \
  --resource-group rke-cluster-rg \
  --name nsg

az network nsg rule create \
  --resource-group rke-cluster-rg \
  --nsg-name nsg \
  --name allow-ssh \
  --priority 1000 \
  --protocol Tcp \
  --destination-port-ranges 22 6443 9345 2379 2380 2381 8472 9099 51820 51821 10250-10252 30000-32767 \
  --access Allow


# Public IP for contolplane
az network public-ip create \
  --resource-group rke-cluster-rg \
  --name rke-pip \
  --sku Standard \
  --allocation-method static

# Controlplane VM
az vm create \
  --resource-group rke-cluster-rg \
  --name controlplane \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub \
  --vnet-name rke-vnet \
  --subnet rke-subnet \
  --nsg nsg \
  --public-ip-address rke-pip

# Create worker
az vm create \
  --resource-group rke-cluster-rg \
  --name worker \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub \
  --vnet-name rke-vnet \
  --subnet rke-subnet \
  --nsg nsg \
  --public-ip-address ""   # <--- NO PUBLIC IP