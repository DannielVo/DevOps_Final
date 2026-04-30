output "manager_ip" {
  value = aws_instance.manager.public_ip
}

output "worker_ips" {
  value = aws_instance.worker[*].public_ip
}