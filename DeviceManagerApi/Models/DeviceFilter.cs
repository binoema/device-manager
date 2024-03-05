namespace DeviceManagerApi.Models
{
  public class DeviceFilter
  {
    public string? Name { get; set; } = "";
    public string? DeviceTypeId { get; set; } = "";
    public bool? Failsafe { get; set; }
    public bool? TerminalElement { get; set; }
    const int MaxPageSize = 20;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10;
    public int PageSize
    {
      get
      {
        return _pageSize;
      }
      set
      {
        _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
      }
    }
  }
}
