#!/bin/bash

sshpass -p 'c1scod1sco' ssh -o StrictHostKeyChecking=no csdc@10.0.0.201 'nohup pwsh -File ~/deployyyz/deployz.ps1 >/dev/null 2>&1 &'