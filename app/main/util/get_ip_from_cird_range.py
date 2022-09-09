import ipaddress
from typing import List


def get_ip_from_cird_range(cird_range: str, remove_unusable: bool = False) -> List[str]:
    ips = [str(ip) for ip in ipaddress.IPv4Network(cird_range)]
    if remove_unusable:
        ips = ips[1:-1]
    return ips
