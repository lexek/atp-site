# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 15:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('streams', '0006_auto_20151214_0022'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='giantbomb_name',
            new_name='giantbomb_id',
        ),
    ]
