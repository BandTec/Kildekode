#!/bin/sh


if [ -d "~/Log-Backup/" ]
then
cp ~/log/*.txt ~/Log-Backup/
zip -r ~/ZipLog.zip ~/Log-Backup/

else
mkdir ~/Log-Backup
cp ~/log/*.txt ~/Log-Backup/
zip -r ~/ZipLog.zip Log-Backup/
fi

rm -rf ~/log/*txt
rm -rf ~/Log-Backup/

