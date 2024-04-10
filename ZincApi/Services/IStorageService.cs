namespace ZincApi.Services;

public interface IStorageService 
{
   string GetBlobUri(string containerName, string blobName);
}