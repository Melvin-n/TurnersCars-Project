from ibm_watson import DiscoveryV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json
import os
from dotenv import load_dotenv
load_dotenv()


# authenticator
authenticator = IAMAuthenticator('xdsynpiafACtY8J3ja9lzJ5ih7JOZ8JDxRuOHnNJd3B4')
discovery = DiscoveryV1(
    version='2022-02-15',
    authenticator=authenticator
)

# set location
discovery.set_service_url('https://api.eu-gb.discovery.watson.cloud.ibm.com')


# create collection 
# new_collection = discovery.create_collection(
#     environment_id = os.environ['ENVIRONMENT_ID'],
#     configuration_id = os.environ['CONFIG_ID'],
#     name = 'Turners-FAQ',
#     description = 'Collection of turners frequently asked questions',
#     language = 'en'
# ).get_result()

# print(json.dumps(new_collection, indent=2))


# collection_fields = discovery.list_collection_fields(
#     os.environ['ENVIRONMENT_ID'],
#     os.environ['TURNERS_COLL_ID']).get_result()
# print(json.dumps(collection_fields, indent=2))



# for each file in folder, add a document to discovery

# disc_docs = os.listdir('./discovery_docs')
# print(disc_docs)

# for doc in disc_docs: 
#     with open(f'./discovery_docs/{doc}') as fileinfo:
#         add_doc = discovery.add_document(
#             os.environ['ENVIRONMENT_ID'], 
#             os.environ['TURNERS_COLL_ID'],
#             file=fileinfo).get_result()
#     print(json.dumps(add_doc, indent=2))


# check document status

# doc_info = discovery.get_document_status(
#     os.environ['ENVIRONMENT_ID'], 
#     os.environ['TURNERS_COLL_ID'], 
#     'ccefb9e5-c2db-4542-852f-bd412c730c2f').get_result()
# print(json.dumps(doc_info, indent=2))


# search by query

query = discovery.query(
    environment_id = os.environ['ENVIRONMENT_ID'],
    collection_id = os.environ['TURNERS_COLL_ID'],
    query = 'car',
    count = 5

)

for res in query.result['results']:
    print(res['text'])


