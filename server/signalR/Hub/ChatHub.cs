using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace signalR
{
    public class ChatHub : Hub
    {
        public async Task SendMessages(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
