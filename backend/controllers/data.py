from flask import jsonify, request
from models.data import Data
from utils import app


@app.route('/data-report/<file_id>', methods=['GET'])
def data_report(file_id):
    if request.method == 'GET':
        result = Data.query.with_entities(
            Data.keyword,
            Data.total_adword,
            Data.total_link,
            Data.total_search_result,
            Data.file_id
        ).filter(
            Data.file_id == file_id
        ).all()
        if result:
            return jsonify(result), 200
        return "Not Found", 404


@app.route('/html-code/<file_id>/<keyword>', methods=['GET'])
def html_code(file_id, keyword):
    if request.method == 'GET':
        result = Data.query.with_entities(
            Data.html_code
        ).filter(
            Data.file_id == file_id,
            Data.keyword == keyword
        ).first()
        if result:
            return jsonify(result[0]), 200
        return "Not Found", 404