# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-13 20:26
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
                ('status', models.CharField(max_length=64)),
                ('viewerCount', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('giantbomb_name', models.IntegerField(null=True)),
                ('gg_id', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provider', models.CharField(choices=[('twitch', 'twitch.tv'), ('cybergame', 'cybergame.tv'), ('goodgame', 'goodgame.ru'), ('ustream', 'ustream.tv')], max_length=32)),
                ('channel_name', models.CharField(max_length=64)),
                ('channel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='channel', to='streams.Channel')),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('key', models.CharField(max_length=64, primary_key=True, serialize=False)),
                ('value', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='game',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streams.Game'),
        ),
        migrations.AddField(
            model_name='channel',
            name='streamer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
