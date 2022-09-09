import ipaddress
from typing import List


def get_ip_from_cird_range(cird_range: str) -> List[str]:
    return [str(ip) for ip in ipaddress.IPv4Network(cird_range)]
