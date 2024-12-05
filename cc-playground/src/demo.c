/* 源文件 demo.c */
#include <linux/kernel.h>
#include <linux/module.h>

static int __init demo_init(void) {
  printk("Init mod");
  return 0;
}

static void __exit demo_exit(void) { printk("Exit mod"); }

module_init(demo_init);
module_exit(demo_exit);

MODULE_DESCRIPTION("undefined");
MODULE_AUTHOR("undefined");
MODULE_LICENSE("GPL");