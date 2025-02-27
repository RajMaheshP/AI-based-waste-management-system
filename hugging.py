from huggingface_hub import HfApi

api = HfApi()
api.create_repo(repo_id="kasinadhsarma/TrashNet_Mode", repo_type="model", exist_ok=True)
api.upload_file(
    path_or_fileobj="backend/TrashNet_Model.h5",
    path_in_repo="TrashNet_Model.h5",
    repo_id="kasinadhsarma/TrashNet_Model",
    repo_type="model"
)
api.upload_file(
    path_or_fileobj="backend/TrashNet_Model.pth",
    path_in_repo="TrashNet_Model.pth",
    repo_id="kasinadhsarma/TrashNet_Model",
    repo_type="model"
)
api.upload_file(
    path_or_fileobj="backend/best.h5",
    path_in_repo="best.h5",
    repo_id="kasinadhsarma/TrashNet_Model",
    repo_type="model"
)
api.upload_file(
    path_or_fileobj="backend/best_model.pth",
    path_in_repo="best_model.pth",
    repo_id="kasinadhsarma/TrashNet_Model",
    repo_type="model"
)
