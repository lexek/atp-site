# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 16:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streams', '0007_auto_20151214_1853'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='giantbomb_id',
            field=models.IntegerField(null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
