variable "aws_region" {
  default = "ap-southeast-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for Ubuntu"
}

variable "key_name" {
  description = "EC2 Key Pair name"
}

variable "image_name" {
  description = "Docker image name"
}