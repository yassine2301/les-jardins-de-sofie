"""Prepare a read-only, public-facing snapshot without WordPress sessions."""
import json
import shutil
import sys
from pathlib import Path
from urllib.parse import parse_qsl, urlsplit

from lxml import etree, html

capture = json.loads(Path(sys.argv[1]).read_text())
target = Path(__file__).parent / "legacy" / "2026-10-22"
target.mkdir(parents=True, exist_ok=True)
page = html.fromstring(capture["page"])
for node in list(page.xpath(".//script | .//iframe | .//input[@type='hidden']")):
    node.drop_tree()
for node in page.iter():
    for name, value in list(node.attrib.items()):
        if name.startswith("on") or any(word in name.lower() for word in ("nonce", "token", "secret", "session")):
            del node.attrib[name]
        elif name in ("href", "action", "src"):
            parsed = urlsplit(value)
            keys = [key.lower() for key, _ in parse_qsl(parsed.query)]
            if "/wp-admin" in parsed.path or any(any(word in key for word in ("nonce", "token", "secret", "session", "key", "add-to-cart", "remove_item")) for key in keys):
                node.attrib[name] = "#"
    if node.tag == "form":
        node.attrib["action"] = "#"
        node.attrib["inert"] = ""
    if node.tag in ("input", "button", "select", "textarea"):
        node.attrib["disabled"] = "disabled"
        if node.tag == "input":
            node.attrib.pop("value", None)

document = html.Element("html", lang="fr")
head = etree.SubElement(document, "head")
etree.SubElement(head, "meta", charset="utf-8")
etree.SubElement(head, "meta", name="viewport", content="width=device-width, initial-scale=1")
etree.SubElement(head, "meta", name="robots", content="noindex,nofollow")
etree.SubElement(head, "title").text = "Ancien WordPress — Les Jardins de Sofie — 22 octobre 2026"
for href in capture["stylesheets"]:
    if urlsplit(href).scheme in ("http", "https") and not any(x in href.lower() for x in ("nonce=", "token=", "secret=")):
        etree.SubElement(head, "link", rel="stylesheet", href=href)
etree.SubElement(head, "style").text = "\n".join(capture["styles"]) + "\nhtml { margin-top: 0 !important; }"
body = etree.SubElement(document, "body")
body.append(page)
(target / "index.html").write_bytes(b"<!doctype html>\n" + html.tostring(document, encoding="utf-8"))
assets = sorted(set(page.xpath(".//img/@src | .//source/@src | .//video/@src | .//img/@data-src")))
(target / "capture.json").write_text(json.dumps({"url":capture["url"], "capturedAt":capture["capturedAt"], "assets":assets, "stylesheets":capture["stylesheets"]}, ensure_ascii=False, indent=2) + "\n")
shutil.copyfile(sys.argv[2], target / "accueil-avant-migration.jpg")
print(json.dumps({"snapshot":str(target), "files":[p.name for p in target.iterdir()], "assets":len(assets)}))
