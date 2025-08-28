import os
import requests
import json
import hashlib
import hmac
from flask import Blueprint, request, jsonify
from datetime import datetime

smm_bp = Blueprint('smm', __name__)

# Configurações do Mercado Pago
MP_ACCESS_TOKEN = "APP_USR-2392510441454512-082810-d85b4ffdc7946634adcc5db901e04cc5-1908102836"
MP_PUBLIC_KEY = "APP_USR-3c7d8b14-237b-4b13-a0a4-48d34941e300"

# Configurações do SMM Oficial
SMM_API_URL = "https://smmoficial.com/api/v2"
SMM_API_KEY = "536fbc3f413319d68fd95dacceaaf716"

# Mapeamento de serviços para IDs do SMM Oficial
SERVICE_MAPPING = {
    # Seguidores
    'seg_100': {'smm_id': 1001, 'quantity': 100},
    'seg_300': {'smm_id': 1001, 'quantity': 300},
    'seg_500': {'smm_id': 1001, 'quantity': 500},
    'seg_700': {'smm_id': 1001, 'quantity': 700},
    'seg_1000': {'smm_id': 1001, 'quantity': 1000},
    'seg_1500': {'smm_id': 1001, 'quantity': 1500},
    'seg_2000': {'smm_id': 1001, 'quantity': 2000},
    'seg_3000': {'smm_id': 1001, 'quantity': 3000},
    'seg_5000': {'smm_id': 1001, 'quantity': 5000},
    'seg_7000': {'smm_id': 1001, 'quantity': 7000},
    'seg_10000': {'smm_id': 1001, 'quantity': 10000},
    'seg_12000': {'smm_id': 1001, 'quantity': 12000},
    'seg_15000': {'smm_id': 1001, 'quantity': 15000},
    'seg_18000': {'smm_id': 1001, 'quantity': 18000},
    'seg_20000': {'smm_id': 1001, 'quantity': 20000},
    'seg_25000': {'smm_id': 1001, 'quantity': 25000},
    'seg_30000': {'smm_id': 1001, 'quantity': 30000},
    'seg_35000': {'smm_id': 1001, 'quantity': 35000},
    'seg_40000': {'smm_id': 1001, 'quantity': 40000},
    'seg_50000': {'smm_id': 1001, 'quantity': 50000},
    
    # Curtidas
    'cur_100': {'smm_id': 1004, 'quantity': 100},
    'cur_300': {'smm_id': 1004, 'quantity': 300},
    'cur_500': {'smm_id': 1004, 'quantity': 500},
    'cur_700': {'smm_id': 1004, 'quantity': 700},
    'cur_1000': {'smm_id': 1004, 'quantity': 1000},
    'cur_1500': {'smm_id': 1004, 'quantity': 1500},
    'cur_2000': {'smm_id': 1004, 'quantity': 2000},
    'cur_3000': {'smm_id': 1004, 'quantity': 3000},
    'cur_5000': {'smm_id': 1004, 'quantity': 5000},
    'cur_7000': {'smm_id': 1004, 'quantity': 7000},
    'cur_10000': {'smm_id': 1004, 'quantity': 10000},
    'cur_12000': {'smm_id': 1004, 'quantity': 12000},
    'cur_15000': {'smm_id': 1004, 'quantity': 15000},
    'cur_18000': {'smm_id': 1004, 'quantity': 18000},
    'cur_20000': {'smm_id': 1004, 'quantity': 20000},
    'cur_25000': {'smm_id': 1004, 'quantity': 25000},
    'cur_30000': {'smm_id': 1004, 'quantity': 30000},
    'cur_35000': {'smm_id': 1004, 'quantity': 35000},
    'cur_40000': {'smm_id': 1004, 'quantity': 40000},
    'cur_50000': {'smm_id': 1004, 'quantity': 50000},
    
    # Visualizações
    'vis_10000': {'smm_id': 998, 'quantity': 10000},
    'vis_25000': {'smm_id': 998, 'quantity': 25000},
    'vis_50000': {'smm_id': 998, 'quantity': 50000},
    'vis_100000': {'smm_id': 998, 'quantity': 100000},
    'vis_200000': {'smm_id': 998, 'quantity': 200000},
    'vis_300000': {'smm_id': 998, 'quantity': 300000},
    'vis_400000': {'smm_id': 998, 'quantity': 400000},
    'vis_500000': {'smm_id': 998, 'quantity': 500000},
    'vis_750000': {'smm_id': 998, 'quantity': 750000},
    'vis_1000000': {'smm_id': 998, 'quantity': 1000000}
}

def call_smm_api(action, params):
    """Chama a API do SMM Oficial"""
    try:
        data = {
            'key': SMM_API_KEY,
            'action': action,
            **params
        }
        
        response = requests.post(SMM_API_URL, data=data, timeout=30)
        response.raise_for_status()
        
        return response.json()
    except Exception as e:
        print(f"Erro ao chamar API SMM: {e}")
        return None

@smm_bp.route('/create-payment', methods=['POST'])
def create_payment():
    """Cria um pagamento no Mercado Pago"""
    try:
        data = request.get_json()
        service_id = data.get('service_id')
        instagram_link = data.get('instagram_link')
        price = data.get('price')
        service_name = data.get('service_name')
        
        if not all([service_id, instagram_link, price, service_name]):
            return jsonify({'error': 'Dados incompletos'}), 400
        
        # Criar preferência de pagamento no Mercado Pago
        payment_data = {
            "items": [
                {
                    "title": service_name,
                    "quantity": 1,
                    "unit_price": float(price),
                    "currency_id": "BRL"
                }
            ],
            "payer": {
                "email": "cliente@email.com"
            },
            "back_urls": {
                "success": "https://seusite.com/success",
                "failure": "https://seusite.com/failure",
                "pending": "https://seusite.com/pending"
            },
            "auto_return": "approved",
            "notification_url": "https://seusite.com/api/webhook",
            "external_reference": json.dumps({
                "service_id": service_id,
                "instagram_link": instagram_link
            })
        }
        
        headers = {
            "Authorization": f"Bearer {MP_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            "https://api.mercadopago.com/checkout/preferences",
            json=payment_data,
            headers=headers
        )
        
        if response.status_code == 201:
            preference = response.json()
            return jsonify({
                'payment_url': preference['init_point'],
                'preference_id': preference['id']
            })
        else:
            return jsonify({'error': 'Erro ao criar pagamento'}), 500
            
    except Exception as e:
        print(f"Erro ao criar pagamento: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

@smm_bp.route('/webhook', methods=['POST'])
def webhook():
    """Recebe webhooks do Mercado Pago"""
    try:
        # Verificar se é uma notificação de pagamento
        if request.args.get('topic') == 'payment':
            payment_id = request.args.get('id')
            
            # Buscar detalhes do pagamento
            headers = {
                "Authorization": f"Bearer {MP_ACCESS_TOKEN}"
            }
            
            response = requests.get(
                f"https://api.mercadopago.com/v1/payments/{payment_id}",
                headers=headers
            )
            
            if response.status_code == 200:
                payment_data = response.json()
                
                # Verificar se o pagamento foi aprovado
                if payment_data['status'] == 'approved':
                    # Extrair dados do external_reference
                    external_ref = json.loads(payment_data.get('external_reference', '{}'))
                    service_id = external_ref.get('service_id')
                    instagram_link = external_ref.get('instagram_link')
                    
                    if service_id and instagram_link:
                        # Processar o pedido no SMM Oficial
                        process_smm_order(service_id, instagram_link, payment_id)
                
        return jsonify({'status': 'ok'})
        
    except Exception as e:
        print(f"Erro no webhook: {e}")
        return jsonify({'error': 'Erro interno'}), 500

def process_smm_order(service_id, instagram_link, payment_id):
    """Processa o pedido no SMM Oficial"""
    try:
        if service_id not in SERVICE_MAPPING:
            print(f"Serviço não encontrado: {service_id}")
            return False
        
        service_config = SERVICE_MAPPING[service_id]
        
        # Criar pedido no SMM Oficial
        order_params = {
            'service': service_config['smm_id'],
            'link': instagram_link,
            'quantity': service_config['quantity']
        }
        
        result = call_smm_api('add', order_params)
        
        if result and 'order' in result:
            print(f"Pedido criado no SMM: {result['order']} para pagamento {payment_id}")
            return True
        else:
            print(f"Erro ao criar pedido no SMM para pagamento {payment_id}")
            return False
            
    except Exception as e:
        print(f"Erro ao processar pedido SMM: {e}")
        return False

@smm_bp.route('/check-balance', methods=['GET'])
def check_balance():
    """Verifica o saldo na conta SMM Oficial"""
    try:
        result = call_smm_api('balance', {})
        
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Erro ao consultar saldo'}), 500
            
    except Exception as e:
        print(f"Erro ao consultar saldo: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

@smm_bp.route('/services', methods=['GET'])
def get_services():
    """Lista os serviços disponíveis no SMM Oficial"""
    try:
        result = call_smm_api('services', {})
        
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Erro ao consultar serviços'}), 500
            
    except Exception as e:
        print(f"Erro ao consultar serviços: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

