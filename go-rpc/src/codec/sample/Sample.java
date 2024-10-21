import java.io.Serializable;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class Sample {
}

class Args implements Serializable {
}

class Reply implements Serializable {
  public int state;

  public Reply(int state) {
    this.state = state;
  }

  @Override
  public String toString() {
    return "Reply{" + "state=" + state + '}';
  }
}

interface IServer extends Remote {
  int method(Args args, Reply reply) throws RemoteException;
}


class Server implements IServer {
  @Override
  public int method(Args args, Reply reply) throws RemoteException {
    reply.state++;
    return reply.state;
  }

  public static void main(String[] args) {
    IServer server = new Server();
    try {
      var stub = (IServer) UnicastRemoteObject.exportObject(server, 0);
      Registry registry = LocateRegistry.createRegistry(1099);
      registry.rebind("Server", stub);
      System.out.println("Server started");
    } catch (RemoteException e) {
      System.err.println(e.getMessage());
    }
  }
}

class Client {
  public static void main(String[] args_) {
    try {
      Registry registry = LocateRegistry.getRegistry("127.0.0.1", 1099);
      var server = (IServer) registry.lookup("Server");
      var args = new Args();
      var reply = new Reply(0);
      int ret = server.method(args, reply);
      System.out.println("Reply: " + reply + ", return: " + ret);
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
  }
}
