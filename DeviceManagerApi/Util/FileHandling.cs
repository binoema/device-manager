using System.Text;

namespace DeviceManagerApi.Util
{
    public static class FileHandling
    {
        public static async Task WriteTextAsync(string filePath, string text)
        {
            byte[] encodedText = Encoding.Unicode.GetBytes(text);

            using var sourceStream =
                new FileStream(
                    filePath,
                    FileMode.Create, FileAccess.Write, FileShare.None,
                    bufferSize: 4096, useAsync: true);

            await sourceStream.WriteAsync(encodedText, 0, encodedText.Length);
        }
    }
}
