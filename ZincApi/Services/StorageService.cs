using Azure.Storage.Blobs;
using ZincApi.Services;

namespace ZincApi.Controllers;

public class StorageService : IStorageService
{
   private readonly string _connectionstring = "";

   public StorageService(IConfiguration configuration)
   {
      _connectionstring = configuration["StorageConnectionString"] ?? "";
   }

   public string GetBlobUri(string containerName, string blobName)
   {
      var blobServiceClient = new BlobServiceClient(_connectionstring);
      var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
      var blobClient = containerClient.GetBlobClient(blobName);
      return blobClient.Uri.ToString();
   }
}