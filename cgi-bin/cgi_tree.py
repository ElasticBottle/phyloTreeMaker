#!/afs/bii.a-star.edu.sg/dept/mendel/METHODS/corona/local/anaconda3/envs/primer/bin/python3.7

import cgi
from cgi import FieldStorage
import cgitb
import json
import subprocess
from typing import Dict, List, Tuple, Union
import time

cgitb.enable()

# Production Path
python_path = "/afs/bii.a-star.edu.sg/dept/mendel/METHODS/corona/local/anaconda3/envs/primer/bin/python3.7"
temp_folder = "/afs/bii.a-star.edu.sg/dept/mendel/METHODS/corona/local/current/tmp/"
phylo_gen_path = "/afs/bii.a-star.edu.sg/dept/mendel/METHODS/corona/gamma/phyloTreeMaker/cgi-bin/phylo_updated.py"

# Temp Path
# python_path = (
#     "C:/Users/Winston/.virtualenvs/GISAID-Analysis-Update-F83y2Gei/Scripts/python.exe"
# )
# temp_folder = "./cgi-bin/temp/"
# phylo_gen_path = "./cgi-bin/phylo_updated.py"


def print_headers():
    print("Access-Control-Allow-Origin: *")
    print("Access-Control-Allow-Headers: *")
    print("Content-Type: application/json")  # HTML is going to follow in the body
    print()  # blank line, end of headers


def parse_form_data(
    form: FieldStorage,
) -> Tuple[Dict[str, str], Dict[str, Union[str, int, float]]]:
    name_mappings = {}
    clade_properties = {}
    input_tree = ""
    other_properties = {}
    for key in form:
        if key == "name_mapping":
            name_mappings = json.loads(form[key].value)
        elif key == "clade_del":
            clade_properties = json.loads(form[key].value)
        elif key == "file":
            input_tree = f"{temp_folder}newick{time.time()}.nwk"
            with open(input_tree, "wb") as f:
                f.write(form[key].value)
        else:
            other_properties[key] = form[key].value
    return (name_mappings, clade_properties, input_tree, other_properties)


def extract_names(value: Dict[str, str]) -> Tuple[str, List[str]]:
    return (value["nameFrom"], [value["nameTo"]])


def extract_clade_properties(
    value: Dict[str, Union[str, int, float]]
) -> Tuple[str, List[Union[str, int, float]]]:
    return (
        value["clade"],
        [
            value["color"],
            float(value["minDensity"]),
            float(value["maxDensity"]),
            float(value["minCoverage"]),
            float(value["maxCoverage"]),
        ],
    )


def main():
    print_headers()
    form = cgi.FieldStorage()

    # No data passed
    if not form:
        print(json.dumps({"error": "no data"}))
        return

    name_mappings, clade_properties, input_tree, other_properties = parse_form_data(
        form
    )
    name_mapping_parsed = {
        nameFrom: nameTo
        for nameFrom, nameTo in map(extract_names, name_mappings.values())
    }
    clade_properties_parsed = {
        clade: properties
        for clade, properties in map(
            extract_clade_properties, clade_properties.values()
        )
    }
    name_mapping_parsed.update(clade_properties_parsed)
    clade_properties_path = f"{temp_folder}clade_props{time.time()}.json"
    with open(clade_properties_path, "w") as f:
        json.dump(name_mapping_parsed, f, separators=(",", ":"))
    output_file = f"{input_tree[:-4]}.svg"
    command = [
        f"{python_path}",
        phylo_gen_path,
        input_tree,
        "-o",
        output_file,
        "-ro",
        other_properties["root_on"],
        "-ccov",
        clade_properties_path,
        "--color-marker",
        other_properties["color_delineator"],
        "--offset",
        other_properties["offset"],
        "-d",
    ]
    if other_properties["quoted"] == "true":
        command.append("--quoted")
    process = subprocess.run(
        command,
        capture_output=True,
        universal_newlines=True,
    )
    if process.stderr:
        print(json.dumps({"error": process.stderr}))
    else:
        svg = ""
        with open(output_file, "r") as f:
            svg = f.readlines()
        print(json.dumps([process.stdout, svg], separators=(",", ":")))


if __name__ == "__main__":
    main()