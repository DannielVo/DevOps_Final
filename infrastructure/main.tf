provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "app_sg" {
  name = "app-sg"

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3000
    to_port   = 3000
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 443
    to_port   = 443
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 2377
    to_port     = 2377
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# MANAGER NODE
resource "aws_instance" "manager" {
  ami           = var.ami_id
  instance_type = var.instance_type

  security_groups = [aws_security_group.app_sg.name]
  key_name        = var.key_name

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io

              systemctl start docker
              systemctl enable docker

              usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "swarm-manager"
  }
}

# WORKER NODES
resource "aws_instance" "worker" {
  count = 2

  ami           = var.ami_id
  instance_type = var.instance_type

  security_groups = [aws_security_group.app_sg.name]
  key_name        = var.key_name

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io

              systemctl start docker
              systemctl enable docker

              usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "swarm-worker-${count.index}"
  }
}