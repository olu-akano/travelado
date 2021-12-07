from rest_framework import serializers
from .models import Reviews
from dotenv import load_dotenv
from pathlib import Path
import os
import jwt

basepath = Path()
basedir = str(basepath.cwd())
env = basepath.cwd() / '.env'
load_dotenv(env)

class ReviewsSerializer(serializers.ModelSerializer):
    # secret = os.getenv('TOKEN_SECRET')
    # token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFrYW5vcGF1bC5zcCIsInNvdXJjZSI6InRyYXZlbGFkbyJ9.1iBESx4XcycK_VPPCgcE80S2IKH3-A-3P8N4xBQpnUI'
    # decoded = jwt.decode(token, secret, algorithms=['HS256'])
    # print(decoded['username'])
    class Meta:
        model = Reviews
        fields = '__all__'
        
    # def change_name(self, username):
    #     name = 'bob'
    #     username = name
    #     return username
