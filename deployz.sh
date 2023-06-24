#!/bin/bash

sshpass -p 'c1scod1sco' ssh -o StrictHostKeyChecking=no csdc@10.0.0.201 'docker kill $(docker ps -q)'
sshpass -p 'c1scod1sco' ssh -o StrictHostKeyChecking=no csdc@10.0.0.201 'pwsh -File ~/deployyyz/deployz.ps1 &'