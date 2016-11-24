how to use:

npm install

1.  pick ip out of file base on percent lossing data 

node . ping1/log1.txt x 0,50,100

ping1/log1.txt : log file path base on program base path

x :  file name which will create 

0,50,100 : kyes, mean will check 0%, 50%, 100% data, pick it out to x-0.txt  x-50.txt x-100.txt  in program base path.

2. try ping ip and create file base on ping status.

node tryPing.js ping1/test.csv test

ping1/test.csv : source ip file

test: file name, it will create test-success.txt  text-failed.txt in program base path.




this will pick the ip out from ping1/log1.txt to files (x-0.txt, x-50.txt, x-100.txt), 0,50,100 stand for percent numbers of lossing data.


source file example:

10.193.0.31 的 Ping 统计信息:
    数据包: 已发送 = 2，已接收 = 0，丢失 = 2 (100% 丢失)，

正在 Ping 10.193.48.30 具有 32 字节的数据:
来自 10.193.48.30 的回复: 字节=32 时间=43ms TTL=117
来自 10.193.48.30 的回复: 字节=32 时间=41ms TTL=117

10.193.48.30 的 Ping 统计信息:
    数据包: 已发送 = 2，已接收 = 2，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 41ms，最长 = 43ms，平均 = 42ms

正在 Ping 10.193.48.31 具有 32 字节的数据:
来自 10.193.48.31 的回复: 字节=32 时间=43ms TTL=117
来自 10.193.48.31 的回复: 字节=32 时间=43ms TTL=117
