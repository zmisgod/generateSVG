package main

import (
	"fmt"
	"log"
	"time"

	pb "github.com/zmisgod/test"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

const (
	address = "0.0.0.0:50051"
)

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("do not connect: %v", err)
	}
	defer conn.Close()

	c := pb.NewNodeServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := c.Png2Svg(ctx, &pb.Png2SvgRequest{ImgUrl: "https://d30y9cdsu7xlg0.cloudfront.net/png/120046-200.png", Width: 300, Height: 300})
	if err != nil {
		log.Fatalf("connect err : %v", err)
	}

	if r.Code == 1 {
		fmt.Println(r.SvgSourceCode)
	} else {
		fmt.Println(r.Msg)
	}
}
